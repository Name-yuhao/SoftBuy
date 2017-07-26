<?php 
	// 获取数据
	$phoneNum = $_GET['phone'];

	// 数组
	$phoneArr  = json_decode(file_get_contents('../data/phone.json'));
	
	
	// 判断并返回结果
	$result = in_array($phoneNum,$phoneArr);

    echo $result;


	sleep(1);
 ?>