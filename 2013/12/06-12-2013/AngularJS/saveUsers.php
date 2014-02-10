<?php
$users = json_decode(file_get_contents('php://input'));
file_put_contents('users.json', $users->users);
