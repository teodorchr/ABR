provider "google" {
  project = "battle-royale-airsoft"
  region  = "europe-west1"
}

resource "google_container_cluster" "abr-gke-cluster" {
  name     = "abr-gke-cluster"
  location = "europe-west1"
  initial_node_count = 1
  node_config {
    preemptible = true
  }
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "primary-preemptible-nodes"
  cluster    = google_container_cluster.abr-gke-cluster.name
  location   = google_container_cluster.abr-gke-cluster.location

  node_config {
    preemptible = true
    machine_type = "e2-micro"
  }

  autoscaling {
    min_node_count = 1
    max_node_count = 5
  }
}
