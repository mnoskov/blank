/**
 * header
 * 
 * sample header
 * 
 * @category	chunk
 * @internal    @overwrite true
 * @internal    @installset sample
 */
<!DOCTYPE html>
<html>
<head>
	<title>[[metatitle]]</title>
	<meta http-equiv="X-UA-Compatible" content="IE=edge"> 
	<base href="[(site_url)]">
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width,initial-scale=1">
	[[metaheaders]] 
	<link rel="icon" type="image/x-icon" href="favicon.ico">
	<link rel="shortcut icon" type="image/x-icon" href="favicon.ico">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0-alpha.4/css/bootstrap.min.css">
	<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/fancybox/3.5.2/jquery.fancybox.min.css">
	<link rel="stylesheet" type="text/css" href="assets/templates/default/css/style.css">
	[(client_head_scripts)]
</head>
<body class="[[template]]">
	[(client_body_start_scripts)]
	<div class="wrap">
		<div class="head-placeholder">
			<div class="head">
				<div class="container">
					<div class="pull-xs-left">
						<div class="logo">
							<a href="/"><img src="[(client_company_logo)]" class="img-fluid"></a>
						</div>

						<div class="pull-xs-left show-on-top hidden-md-down text">
							[[nl2br? &in=`[(client_head_text)]`]]
						</div>
					</div>

					<div class="pull-xs-right text-xs-right">
						<div class="wi-group phone">
							<i class="icon-phone"></i>
							[[splitRows? &in=`[(client_company_phone)]` &tpl=`phones_row`]]
						</div>

						<a href="#" data-toggle="modal" data-target="#callback" class="btn btn-hollow-theme callback">Заказать звонок</a>
					</div>
				</div>
			</div>
			
			<div class="head-menu">
				<div class="container">
					<div class="menu">
						[[DLMenu? &parents=`1` &maxDepth=`2`]]
					</div>
				</div>
			</div>
		</div>
