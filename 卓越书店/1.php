<?php 
 header("Content-Type:text/html;charset=utf-8"); 
 session_start(); 
 if(isset($_POST['login'])) 
 { 
  $username = trim($_POST['username']); 
  $password = trim($_POST['password']); 
  if(($username=='')||($password=='')) 
  { 
   header('refresh:3;url=login.html'); 
   echo "���û��������벻��Ϊ�գ�3�����ת����¼ҳ��"; 
   exit; 
  } 
  else if(($username!='username')||($password!='password')) 
  { 
   //�û������������ 
   header('refresh:3;url=login.html'); 
   echo "�û������������3�����ת����¼ҳ��"; 
   exit; 
  } 
  else if(($username=='username')&&($password=='password')) 
  { 
   //��¼�ɹ�����Ϣ���浽session�� 
   $_SESSION['username']=$username; 
   $_SESSION['islogin']=1; 
   //�����ѡ7�����Զ����棬���䱣�浽cookie 
   if($_POST['remember']=="yes") 
   { 
    setcookie("username",$username,time()+7*24*60*60); 
    setcookie("code",md5($username.md5($password)),time()+7*24*60*60); 
   } 
   else
   { 
    setcookie("username",'',time()-1); 
    setcookie("code",'',time()-1); 
   } 
   //��ת���û���ҳ 
   header('refresh:3;url=index.php'); 
  } 
 } 
?>