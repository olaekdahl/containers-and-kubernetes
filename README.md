# Docker + Kubernetes (KinD) Demos with Cosign Signing

This repo contains runnable demos that progress step-by-step and add **image signing, SBOM attestation, and verification** with **Sigstore Cosign**.

## Layout

```text
docker-demos/
  01-hello-docker/
  02-multistage-and-compose/
k8s-kind-demos/
  01-kind-and-deploy/
  02-service-and-rollout/
  03-ingress-and-hpa/
.github/workflows/
  docker-ci.yml                # build, scan, push
  kind-01.yml                  # KinD deploy smoke
  kind-02.yml                  # Service & rollout
  kind-03.yml                  # Ingress & HPA
  sign-attest-verify.yml       # cosign sign + attest + verify
scripts/
  generate-sbom.sh
```

> Default registry is **GHCR** using the built-in `GITHUB_TOKEN`.

## Quick Start

1) Push to a new repo. The **Docker CI** workflow builds and on `main` pushes
   `ghcr.io/OWNER/REPO:sha-<sha>`.

2) Run **Sign/Attest/Verify** from the Actions tab (or push to `main`):
   it signs the pushed image (keyless via OIDC), generates an SBOM, attests it,
   then verifies both the signature and the attestation.

3) Run KinD demos (`kind-01`, `kind-02`, `kind-03`) manually from the Actions tab.
   They stand up a KinD cluster on the runner, swap the image tag, deploy, and test.

## Prereqs

- GitHub repository with Actions enabled
- `Packages: write` permission for workflows (GHCR push)
- Optional local: Docker Desktop (or CLI), kubectl, kind

## Notes on Cosign Keyless

- Uses GitHub OIDC to sign **without managing keys**.
- Verification includes the OIDC issuer (`https://token.actions.githubusercontent.com`).
- You can further restrict with `--certificate-identity` to pin to a specific workflow identity.
  See inline comments in the workflow for how to set it.

---

## Local Try (Docker Demo)

```bash
cd docker-demos/01-hello-docker
make build && make run
curl localhost:3000
```

## Local Try (Compose Demo)

```bash
cd docker-demos/02-multistage-and-compose
docker compose up --build -d
curl localhost:3000
```

## Local Kind

```bash
kind create cluster --name demo
kubectl apply -f k8s-kind-demos/01-kind-and-deploy/k8s/deployment.yaml
kubectl rollout status deploy/hello --timeout=120s
```

---

### Security Add-ons

- Add `cosign verify --certificate-identity` filters to pin to your repo/workflow.
- Add `cosign verify-attestation --type slsaprovenance` if you also create provenance.
- Add policy control with `connaisseur` or `kyverno` to only allow signed images.
