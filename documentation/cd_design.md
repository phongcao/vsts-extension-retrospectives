# High Level Design for Continuous Delivery

## Overview

The purpose of this document to gather the specifications / requirements  and outline a
strategy for Continous Delivery (CD) for the open source repo. Having a dependable, automated
CD environment increases confidence to push out quality updates to the extension.

## Goals

1. Identify specifications around environments needed.

1. Identify and make recommendation for atuomated testing.

1. Versioning and Rollback Strategy.

### Stages / Pipelines

1. There will be different stages and corresponding Market Place extension deployments for each pipline.
1. The various stages will be `Alpha`, `Beta`, `Release Candidate (RC)` and `General
Availability (GA)`.
1. Each of these stages will deploy an stage-specific extension to the
Market Place identifying them using different Publisher IDs.
1. GA will be the only publicly available extension. Extensions for other
stages - Alpha, Beta, RC will be private.

#### Alpha Stage

This is a private pipeline will be based on a feature or main branch and exists for
open source maintainers to quickly test the extension. This pipeline will be manually
run and the extension will be installed to the `Alpha Publisher ID` on the Market Place.

#### Beta Stage

This pipeline is automated on any check-ins into the `Feature` branch and will be used for PR validation. The automated tests, cred scanning and other linters re run at
this statge to ensure that the code is of good quality. The exension will be installed to the `Beta Publisher ID` in the Market Place.

### Release Candidate (RC)

This pipeline will be run against the `Main` branch and internally released to test out any critical problems that may be undetected in the previous cycles. The extension is pubished to the `Release Candiate Publisher ID` in the Market Place.

Automated tests along with the linters and cred scanning are run before the extension is published. The Smoke tests runs in this pipeline will install the extension to a privately shared Azure DevOps Organization and perform basic tests to ensure that the Extension is installed. It is recommended integrate smoke tests and end-to-end integration tests in this stage to identify any potential issues during and after installation of the extension.

### General Availability (GA)

The code on the `Main` branch is bundled as a release to `Production` using this pipeline. This pipeline is manually run by the Open Source Maintainer by creating a [release](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository). Also a good read on [automating release notes](https://docs.github.com/en/repositories/releasing-projects-on-github/automatically-generated-release-notes).

### Versioning and Rollback Strategy

Versioning in GitHub can be managed using Git Tag using Actions like [Git-Version](https://github.com/marketplace/actions/git-version).