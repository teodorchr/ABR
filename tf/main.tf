provider "google" {
  project = "battle-royale-airsoft"
  region  = "europe-west1"
}

resource "google_container_cluster" "primary" {
  name     = "abr-gke-cluster"
  location = "europe-west1"

  node_config {
    machine_type = "e2-medium"
  }

  initial_node_count = 1
}
