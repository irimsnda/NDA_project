<?php

namespace App\Jobs;

use App\Mail\GenericPlainMail;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class GenericSendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 5;
    protected $email,
        $subject,
        $cc_to,
        $message;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, $subject, $message,$cc_to = array())
    {
        $this->email = $email;
        $this->subject = $subject;
        $this->message = $message;
        
        $this->cc_to = $cc_to;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {

            Mail::to($this->email)
            ->cc($this->cc_to)
            ->send(new GenericPlainMail($this->subject, $this->message));
            
            $params = array(
                'email_to' => $this->email,
                'subject' => $this->subject,
                'cc_to' => implode("-", $this->cc_to),
                'message' => $this->message,
                'exception' => 'All went well',
                'created_on' => Carbon::now()
            );
            
            DB::table('tra_email_notifications')
                ->insert($params);
        } catch (\Exception $exception) {
            $this->failed($exception);
        }
    }

    public function failed(\Exception $exception)
    {
        $params = array(
            'email_to' => $this->email,
            'subject' => $this->subject,
            'message' => $this->message,
            'exception' => $exception->getMessage(),
            'created_on' => Carbon::now()
        );
        DB::table('tra_failed_emails')
            ->insert($params);
    }
}
