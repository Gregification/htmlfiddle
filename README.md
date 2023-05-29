# Html Fiddle 
a apache webserver ran out of docker. is not criticaly dependent on external services. <br>

images used 
 - php:7.4-apache
 - postgres:15

frameworks
 - apache
 - bootstrap

--- 

## How to visit
ocassionaly avaliable at [47.37.113.251:8080](http://47.37.113.251:8080) . otherwise you can host it yourself.<br>

## To host it yourself 
> *note : the powershell scriptes are only to help automate docker commands. they are not necessary* <br>

WINDOWS
1. install Docker & clone this repo. turn on the docker daemon.
1. create a ```postgres:15``` container (ex: name->_testdb_ , port->_5432_)
1. inside the new db, create a few tables with
    ```
    create table if not exists _chattemplet (timeDelivered_u DATE,  id serial,  sentBy VARCHAR(255),    message VARCHAR(940));
    create table if not exists _users       (username VARCHAR(255)  PRIMARY KEY,    creationtime BIGINT,    lastactivetime BIGINT);
    create table if not exists _images      (id serial primary key, imgname varchar(512),   img bytea);
    create table if not exists _chats       (title varchar(255),    usersonline int,    lastactivetime bigint);
    ```
1. navigate to the folder containing [run_phpApache.ps1](https://github.com/Gregification/htmlfiddle/blob/main/run_phpApache.ps1)
1. run ```.\run_phpApache.ps1 -rebuild -visit -dbContainer testdb -dbport 5432```
    - or ```.\run_phpApache.ps1 -help``` for help. or see the param fields of [the script](https://github.com/Gregification/htmlfiddle/blob/main/run_phpApache.ps1) (starts line 5).<br>
1. check that [private_request/config.php](https://github.com/Gregification/htmlfiddle/blob/main/private_request/config.php) has the correct information for the psql db. the file [psqlConnecitonInfo.json](https://github.com/Gregification/htmlfiddle/blob/main/private_request/psqlConnectionInfo.json) is needed, its generated by the powershell script. it supplies the psql db's port & ip inside the docker network.


- to quit run ```.\run_phpApache.ps1 -stop``` or stop the containers manualy

<p align="right"><img src="https://raw.githubusercontent.com/Gregification/htmlfiddle/main/htdocs/favicon.ico"></p>