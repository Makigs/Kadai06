<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>かんたんシミュレーション結果</title>
		<link rel="stylesheet" href="css/reset.css" />
    <link rel="stylesheet" href="css/style_easy_result.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Cormorant:wght@500&family=M+PLUS+Rounded+1c:wght@700&display=swap" rel="stylesheet">


</head>
<body>
    
	<div class="main_wrap">
		<div class="main">
			<div class="main_message">シミュレーション<br/>結果</div>
			<div class="main_message_2">ORAL HEALTH SIMULATION</div>
			<div class="main_message_3">かんたんシミュレーションの結果です</div>
		</div>
	</div>
	<section class="res-section">
		<div class="res-section-body">
			<div class="res-h2"><h2>結果</h2></div>

			<div class="s-form-e-wrap">
				<div class="s-form-e-item">
					<span class="s-form-e-item_ttl1">AIシミュレーション(TensorFlowによる物体検出)</span></span></div>
				<div class="ai_result">
					<img class="pic_ai_result">
				</div>
			</div>

			<div class="s-form-e-wrap-res">
				<div class="jq_res"></div>

			</div>

		</div><!-- res-section-body -->
	</section>

	<button class="clear">テスト用clearボタン</button>


	<section class="teeth">
		<div class="teeth_kun"><img class="main_pic" src="img/tooth.png" alt="歯君" /></div>
	</section>

	<footer>
    <div class="footer">©2023 - ORAL HEALTH SIMULATION site</div>
  </footer>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="js/main.js" type="module"></script>

</body>
</html>