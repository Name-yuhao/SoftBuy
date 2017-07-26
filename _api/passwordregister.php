<?php 
	// 注册页面
	// 获取 用户提交的数据
//	$userData = $_POST;

	// 如果 我们能够把 格式 写成 json格式-->string
	$password = $_POST['password'];

	// PHP中 对象 ->字符串
	$passwordArr = json_decode(file_get_contents('../data/password.json'));
	$passwordArr[count($passwordArr)] = $password;
	// 保存到 数据库中
	// 写入文本文件中
	file_put_contents('../data/password.json',json_encode($passwordArr));

	echo 'success';

	sleep(1);
 ?>