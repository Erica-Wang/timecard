## doc on all the endpoints 

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

### post /validateTimecard

input:

1. id: timecard ID

### post /completeTask

input:

1. id: workerid
2. jobCode
3. activityCode
4. rate
5. hrs
6. overtime
7. timeCode



 