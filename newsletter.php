<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" style="height: 100%;"> <!--<![endif]-->
<html lang="en">

<head>

  <title>model viewer</title>
  <meta charset="utf-8">
  <meta content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no, width=device-width" name="viewport" />
  <!-- Begin MailChimp Signup Form -->
  <!-- <link href="//cdn-images.mailchimp.com/embedcode/classic-10_7.css" rel="stylesheet" type="text/css"> -->
  <link rel="stylesheet" type="text/css" href="css/css.css">
  <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">

</head>

<body style="margin:0;">

<?php

/*print_r($_POST);*/

?>

  <table class="sign-up-wrap2">
    <tr>
      <td>
        <div>
          <div class="signup2">
            <div id="mc_embed_signup">
              <form action="//siggraph.us8.list-manage.com/subscribe/post?u=5fb771834dca854450f51d6f4&amp;id=d4636f850b" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
                <div id="mc_embed_signup_scroll">
                  <div class="title-container">
                    <div class="form-title"><h2>Subscribe to the London ACM SIGGRAPH Newsletter</h2></div>
                    <div class="form-subtitle">Enter your email address and name and receive all the latest news about upcoming events.</div>
                  </div>
                  <div class="form-fields">
                    <div class="indicates-required"><span class="asterisk">*</span> indicates required</div>
                    <div class="mc-field-group ">
                      <label for="mce-EMAIL">Email Address  <span class="asterisk">*</span></label>
                      <input type="email" value="<?php echo $_POST['email']; ?>" name="EMAIL" class="required email" id="mce-EMAIL">
                    </div>

                    <div class="mc-field-group size1of2" >
                      <label for="mce-FNAME">First Name  <span class="asterisk">*</span></label>
                      <input type="text" value="" name="FNAME" class="required" id="mce-FNAME">
                    </div>

                    <div class="mc-field-group size1of2" >
                      <label for="mce-LNAME">Last Name  <span class="asterisk">*</span></label>
                      <input type="text" value="" name="LNAME" class="required" id="mce-LNAME">
                    </div>

                    <div class="mc-field-group size1of2" id="mce-LNAME-field-group">
                      <label for="mce-MMERGE3-month">Birthday </label>
                      <div class="datefield">
                        <span class="subfield dayfield">
                          <input class="datepart " type="text" pattern="[0-9]*" value="" placeholder="DD" size="2" maxlength="2" name="MMERGE3[day]" id="mce-MMERGE3-day">
                        </span> /
                        <span class="subfield monthfield"><input class="datepart " type="text" pattern="[0-9]*" value="" placeholder="MM" size="2" maxlength="2" name="MMERGE3[month]" id="mce-MMERGE3-month"></span>
                        <span class="small-meta nowrap">( dd / mm )</span>
                      </div>
                    </div>

                    <div class="mc-field-group size1of2">
                      <label for="mce-MMERGE4">Postcode </label>
                      <input type="text" value="" name="MMERGE4" class="" id="mce-MMERGE4">
                    </div>

                    <div class="mc-field-group input-group size1of2">
                      <div class="size1of2"><strong>Are you a...  <span class="asterisk">*</span></strong></div>
                      <ul class="gfield_radio size1of2"><li><input type="radio" value="Professional" name="MMERGE5" id="mce-MMERGE5-0"><label for="mce-MMERGE5-0">Professional</label></li>
                        <li><input type="radio" value="Student" name="MMERGE5" id="mce-MMERGE5-1"><label for="mce-MMERGE5-1">Student</label></li>
                      </ul>
                    </div>

                    <div class="mc-field-group size1of2">
                      <label for="mce-MMERGE7">Company/University  <span class="asterisk">*</span></label>
                    	<input type="text" value="" name="MMERGE7" class="required" id="mce-MMERGE7">
                    </div>

                  	<div id="mce-responses" class="clear">
                  		<div class="response" id="mce-error-response" style="display:none"></div>
                  		<div class="response" id="mce-success-response" style="display:none"></div>
                  	</div>    <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->

                    <div style="position: absolute; left: -5000px;" aria-hidden="true">
                      <input type="text" name="b_5fb771834dca854450f51d6f4_c71a409d28" tabindex="-1" value="">
                    </div>
                  </div><!--end form field -->

                  <div class="clear">
                    <div class="sumbit-button cmn-t-border-radius">
                      <input type="submit" value="Sign up our newsletter" name="subscribe" id="mc-embedded-subscribe" class="button ">
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </tr>
    </td>
  </table>

  <script type='text/javascript' src='//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js'></script><script type='text/javascript'>(function($) {window.fnames = new Array(); window.ftypes = new Array();fnames[0]='EMAIL';ftypes[0]='email';fnames[1]='FNAME';ftypes[1]='text';fnames[2]='LNAME';ftypes[2]='text';fnames[3]='MMERGE3';ftypes[3]='birthday';fnames[4]='MMERGE4';ftypes[4]='text';fnames[5]='MMERGE5';ftypes[5]='radio';fnames[7]='MMERGE7';ftypes[7]='text';fnames[6]='MMERGE6';ftypes[6]='text';fnames[9]='MMERGE9';ftypes[9]='dropdown';fnames[8]='MMERGE8';ftypes[8]='text';}(jQuery));var $mcj = jQuery.noConflict(true);</script>
  <!--End mc_embed_signup-->

</body>
</html>
