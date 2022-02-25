packer {
  required_plugins {
    amazon = {
      version = ">= 0.0.2"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

source "amazon-ebs" "custom-ami" {

  ami_name      = "myNode-ami"
  instance_type = "t2.micro"
  region        = "us-east-1"
  source_ami    = "ami-033b95fb8079dc481"
  ssh_username  = "ec2-user"
}


build {
  name = "custom-ami-builder"
  sources = [
    "source.amazon-ebs.custom-ami"
  ]

  provisioner "shell" {
    scripts = [
      "config-install.sh"
    ]
  }
}
