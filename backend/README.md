## doc on all the endpoints 

#### acceptable premiums
1. "SHIFT PREMIUM"
2. "DAILY STAND BY"
3. "APPOINTED CREW LEADER"
4. "RESPONSIBILITY"
5. "WELDER",
6. "UNPAID TIME",
7. "1.5"
8. "2"
9. "MEAL ALLOWANCE"

### get /workerRegister

input:

1. id: worker id
2. name
3. password
4. timecode
5. employeeType
6. workUnit
7. department

### get /managerRegister

input:

1. id: worker id
2. name
3. password

output:

1. auth:"true" - logged in
2. auth:"false" - failed

### get /workerlogin

input:

1. id: worker id
2. password: password

output:

1. auth:"true" - logged in
2. auth:"false" - failed

### get /managerLogIn

input:

1. id: worker id
2. password: password

output:

1. auth:"true" - logged in
2. auth:"false" - failed

### get /managerGetTasks (there can only be one manager oop)

output:

1. {_id, jobCode, activityCode, managerAssigned, workerAssigned, notes}

### post /assignTask (there can only be one manager oop)

input:

1. workerID
2. managerID
3. notes
4. taskID

### get /employeeGetTasks

input:

1. workerID

output:

1. {_id, jobCode, activityCode, managerAssigned, workerAssigned, notes}

### get /getPossibleActivities

input:

1. loc: location/job code

output:

1. [{see json file}]

### post /completeTask

input:

1. id: workerid
2. jobCode
3. activityCode
4. rate
5. hrs
6. overtime
7. timeCode
8: premiums: give a json file, key = premium name, value = empty for "MEAL ALLOWENCE"/"1.5"/"2", # of hrs for rest (SEE FULL LIST IN FRONT OF FILE)


### post /validateTimecard

input:

1. id: timecard ID

### get /getPersonInfo

input:

1. id: a person's ID (can be manager or employee)

output:
1. {role(either manager/employee), other fields in the employee/manager mongo object}

### get /getTimecards

output:
1. [{timecard objects see in mongo}]
