#!/bin/zsh

yarn schema:drop
yarn schema:sync

yarn seed:run -s CreateInitialClientData
yarn seed:run -s CreateInitialDepartmentData
yarn seed:run -s CreateInitialStaffData
yarn seed:run -s CreateInitialProjectData
yarn seed:run -s CreateInitialParticipationData
yarn seed:run -s CreateInitialRoleData