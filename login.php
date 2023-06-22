<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>お口の健康シミュレーション</title>
    <link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant:wght@500&family=M+PLUS+Rounded+1c:wght@700&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
  <?php
        $name = $_POST["name"];
        $mail = $_POST["mail"];
        $password = $_POST["password"];

        $name = htmlspecialchars($name);
        $mail = htmlspecialchars($mail);
        $password = htmlspecialchars($password);

        $data = $name."/".$mail."/".$password."\n";
        file_put_contents("data/data.txt", $data, FILE_APPEND);


				$dsn = "mysql:dbname=gs_0620;host=localhost";
				$user = "root";
				$password_db = "";
				$dbh = new PDO($dsn,$user,$password_db);
				$dbh->query("SET NAMES utf8");

				$sql = 'INSERT INTO gs_an_table2 (name,mail,password) VALUES("'.$name.'","'.$mail.'","'.$password.'")';
				$stmt = $dbh->prepare($sql);
				$stmt->execute();

				$dbh = null;
  ?>

    <header class="header">
      <ul class="navi">

			<?php
			  print "こんにちは、".$name."さん！";
				print $mail;	
				print $password;

			?>

			</ul>
    </header>

    <div class="main_wrap">
      <div class="main">
        <div class="main_position">
          <div class="main_message">お口の健康<br />シミュレーション</div>
          <div class="main_message_2">ORAL HEALTH SIMULATION</div>
          <div class="main_message_3">まずはシミュレーションしてみましょう</div>
          <div class="btn_wrap">
            <div class="easy_sim_btn">
              <div class="btn btn_anime bg_anime" id="btn-hover">
                <a href="easy_sim.html"
                  ><span>かんたんシミュレーション</span></a
                >
              </div>
            </div>
            <div class="detail_sim_btn">
              <div class="btn btn_anime">
                <a href=""
                  ><span>くわしくシミュレーション</span
                  ><span class="soon">comming soon</span></a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="main_pic_wrap">
          <img class="main_pic" src="img/tooth.png" alt="歯君" />
        </div>
      </div>
    </div>
    <!-- main_wrap -->

    <div class="login-modal-wrapper disable" id="login-modal">
    	<div class="login-button-modal">
        <div class="close-modal">
          <i class="fa fa-times">×</i>
        </div>
        <div id="login-form">
          <h2>ログイン情報を入力してください</h2><br><br>
					<form action="login.php" method="post" class="table-login">
            <table bordercolor="#FFFFFF">
              <tr>
                <td height="50" width="100" class="type">お名前: </td>
                <td height="50"><input type="text" name="name" class="c-form-text"></td>
							</tr>
              <tr>
                <td height="50" width="100" class="type">EMAIL: </td>
                <td height="50"><input type="text" name="mail" class="c-form-text"></td>
							</tr>
              <tr>
                <td height="50" width="100" class="type">PassWord: </td>
                <td height="50"><input type="text" name="password"  class="c-form-text"></td>
							</tr>
            </table>
              <!-- <div class="login-btn btn_anime bg_anime" id="btn-hover"> -->
            <input type="submit" value="送信" class="login-btn btn_anime bg_anime" id="btn-hover">
            <!-- </div> -->
          </form>

        </div>
      </div>
    </div>

    <section class="titleDetail">
      <div class="titleDetail_wrap">
        <div class="titleDetail_title">お口の健康シミュレーションとは</div>
        <div class="titleDetail_detail">
          あなたの10年、20年後のお口の健康状態……。<br />
          いつまでも健康な歯と口元を保つために、具体的にどのようなケアが必要なのか考えたことはありますか？
          この口腔健康シミュレーションでは、年齢や歯磨きの頻度などの情報を入力し、さらにAI画像診断を使って口腔内の健康度をチェックすることができます。<br /><br />
          操作は簡単なので、健康な口腔を維持するためのあなたのアクションプランを今すぐ確認してみましょう！
        </div>
      </div>
    </section>

    <section class="teeth">
      <div class="teeth_kun">
        <img class="main_pic_2" src="img/tooth.png" alt="歯君" />
      </div>
    </section>

    <footer>
      <div class="footer">©2023 - ORAL HEALTH SIMULATION site</div>
    </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/main.js" type="module"></script>
  </body>
</html>
