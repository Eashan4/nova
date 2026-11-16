# PBL-3 evidence

Nova (Next.js storefront) deployed on a single-node K3s cluster on AWS EC2, with Jenkins, Docker Hub and Trivy.

| # | Screenshot | Experiment | Evidence |
|---|-----------|-----------|----------|
| 01 | `PBL3_01_Infrastructure.png` | all | Nodes, deployments, pods, services, HTTP 200 on both NodePorts |
| 02 | `PBL3_02_Jenkins_Dashboard.png` | 7 | Jenkins jobs and build history (REST API) |
| 03 | `PBL3_03_Jenkins_Pipeline_Success.png` | 7 | `nova-cicd` #2: checkout, build, Trivy, push, deploy, verify, SUCCESS |
| 04 | `PBL3_04_Docker_Image_Pushed.png` | 7 | `ramdev23/nova:build-2` pushed to Docker Hub |
| 05 | `PBL3_05_Kubernetes_Deployment.png` | 7 | `nova` rolled out with the Jenkins-built image |
| 06 | `PBL3_06_Blue_Deployment.png` | 8 | Blue deployment (v1) running |
| 07 | `PBL3_07_Green_Deployment.png` | 8 | Green deployment running |
| 08 | `PBL3_08_BlueToGreen_Switch.png` | 8 | Jenkins `nova-bluegreen` #1: deploy to idle colour, smoke test, switch, 20/20 HTTP 200 |
| 09 | `PBL3_09_Rollback.png` | 8 | Jenkins `nova-bluegreen` #2: rollback to blue, 20/20 HTTP 200 |
| 10 | `PBL3_10_Trivy_Scan.png` | 9 | Trivy image and dependency scan (HIGH/CRITICAL) |
| 11 | `PBL3_11_K8s_Security.png` | 9 | Non-root, read-only rootfs, dropped capabilities, network policies, config scan 18 -> 4 failures |
| 12 | `PBL3_12_Final_Nova_Website.png` | all | Live site via the public ingress |

`*_manual.png` are the same blue/green switch and rollback run by hand with `kubectl`.
Raw command output for every screenshot is in `transcripts/`.
Screenshots 01-11 are rendered from real command and Jenkins output captured over SSH / the Jenkins REST API.

## Layout
- `Jenkinsfile`: CI/CD pipeline (experiment 7, scan stage for 9)
- `Jenkinsfile.bluegreen`: blue-green switch and rollback (experiment 8)
- `k8s/`: hardened deployment, network policies, ingress (experiment 9)

## Findings
Trivy reports 39 HIGH/CRITICAL findings in the image (Next.js 15.5.23, tar, brace-expansion, OS libraries). Fixed versions exist; upgrading `next` and rebuilding through the pipeline is the follow-up.
