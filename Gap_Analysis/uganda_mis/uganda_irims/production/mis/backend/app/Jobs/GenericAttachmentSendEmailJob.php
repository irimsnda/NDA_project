<?php

namespace App\Jobs;

use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\DB;
use App\Mail\GenericAttachmentMail;
use Illuminate\Support\Facades\Mail;

class GenericAttachmentSendEmailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    public $tries = 5;
    protected $email,
        $subject,
        $message,
        $report,
        $attachment_name;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($email, $subject, $message, $report, $attachment_name)
    {
        $this->email = $email;
        $this->subject = $subject;
        $this->message = $message;
        $this->report = $report;
        $this->attachment_name = $attachment_name;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        try {
            Mail::to($this->email)->send(new GenericAttachmentMail($this->subject, $this->message, $this->report, $this->attachment_name));
            $params = array(
                'email_to' => $this->email,
                'subject' => $this->subject,
                'attachment_name' => $this->attachment_name,
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