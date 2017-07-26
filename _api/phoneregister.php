<?php 
	// 注册页面
	// 获取 用户提交的数据
//	$userData = $_POST;

	// 如果 我们能够把 格式 写成 json格式-->string
	$phoneNum = $_POST['phoneNum'];

	// PHP中 对象 ->字符串
	$phoneArr = json_decode(file_get_contents('../data/phone.json'));
	$phoneArr[count($phoneArr)] = $phoneNum;
	// 保存到 数据库中
	// 写入文本文件中
	file_put_contents('../data/phone.json',json_encode($phoneArr));

	echo 'success';

	sleep(1);
 ?>