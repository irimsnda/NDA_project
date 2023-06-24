<?php

namespace App\Helpers;
use Illuminate\Support\Facades\Mail;
class NotificationHelper
{

	static function sendMailNotification($trader_name, $to,$subject,$email_content,$cc,$bcc,$attachement,$attachement_name){
		$from_email = 'mis@tfda.go.tz';// Config('constants.mail_from_address');

		if($to != ''){
			$to = explode(';',$to);
		}
    if($cc != ''){
			 $cc = explode(';',$cc);
		}
		if($bcc != ''){
			$bcc = explode(';',$bcc);
	 } 
		$data = array(
			'subject' => $subject,
			'email_content' => $email_content,
			'trader_name' => $trader_name,
			'from_email'=>$from_email,
			'to'=>$to,
			'title'=>$subject
		);
		Mail::send('emailnotification', $data, function($message)use ($to,$trader_name,$from_email,$subject,$cc,$bcc,$attachement,$attachement_name) {
				$message->to($to, $trader_name)->subject($subject);
				$message->from($from_email,'System Generated Notification');

				if($cc){
						$message->cc($cc);
				}
				if($bcc){
					$message->bcc($bcc);
			}
				if($attachement != ''){
						$message->attach($attachement, [
								'as'=> $attachement_name.'.pdf',
								'mime' => 'application/pdf',
						]);
				}
	 });

		if (Mail::failures()) {
			$data = array('success'=>false, 'message'=>'Email submission failed, contact system admin for further guidelines');
		}
		else{
			$data = array('success'=>true, 'message'=>'Email Sent successfully');
		}
		return $data;
	}

}
