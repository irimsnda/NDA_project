<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class AccountActivation extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public $username = " ";
    public $password = " ";
    public $link = " ";
    protected $notification_subject = '';
    protected $notification_message = '';

    public function __construct($notification_subject, $notification_message, $email, $password, $link)
    {
        $this->username = $email;
        $this->password = $password;
        $this->link = $link;
        $this->notification_subject = $notification_subject;
        $this->notification_message = $notification_message;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        $data['username'] = $this->username;
        $data['password'] = $this->password;
        $data['link'] = $this->link;
        $data['notification_subject'] = $this->notification_subject;
        $data['notification_message'] = $this->notification_message;
        return $this->view('mail.accountActivation')
            ->subject($this->notification_subject)
            ->with($data);
    }
}
