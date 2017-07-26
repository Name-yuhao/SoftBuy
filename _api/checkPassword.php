<?php 
	// 获取数据
	$password = $_GET['password'];

	// 数组
	$passwordArr  = json_decode(file_get_contents('../data/password.json'));
	
	
	// 判断并返回结果
	$result = in_array($password,$passwordArr);

    echo $result;

	sleep(1);
 ?>