packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "AWS_ACCESS_KEY_ID" {
  type = string
  default = ""
}
variable "AWS_SECRET_ACCESS_KEY" {
  type = string
  default = ""
}

source "amazon-ebs" "custom-ami" {

  ami_name      = "myNode-ami"
  instance_type = "t2.micro"
  region        = "us-east-1"
  source_ami    = "ami-033b95fb8079dc481"
  ssh_username  = "ec2-user"
  ami_users     = ["960807583305"]
}

build {
  name = "custom-ami-builder"
  sources = [
    "source.amazon-ebs.custom-ami"
  ]

  provisioner "shell" {
      inline =  [
      "mkdir app",
      "chmod 755 /app/" 
      ]
  }

  provisioner "file" {
    source = "nodeFile.zip"
    destination = "/app/"
  }

  provisioner "shell" {
      inline =  [
      "cd app"
      "unzip nodeFile.zip"
      ]
  }

  provisioner "shell" {
    scripts = [
      "installer.sh"
    ]
  }
}