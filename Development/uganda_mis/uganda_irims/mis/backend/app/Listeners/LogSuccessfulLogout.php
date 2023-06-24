<?php
    namespace App\Listeners;
    use Illuminate\Auth\Events\Logout;
    use App\Models\User;
    use Illuminate\Support\Facades\DB;
    use Carbon\Carbon;
    class LogSuccessfulLogout
    {
        /**
         * Create the event listener.
         *
         * @return void
         */
        public function __construct()
        {
            //
        }

        /**
         * Handle the event.
         *
         * @param  Logout  $event
         * @return void
         */
        public function handle(Logout $event)
        {
            $user_id = \Auth::user()->id;
            //get last login entry
            $log_rec = DB::table('tra_login_logs')->where('user_id', $user_id)->orderBy('id', 'DESC')->first();
            //upadate logout time
            if(isset($log_rec->id)){
                 DB::table('tra_login_logs')->where('id', $log_rec->id)->update(['logout_time'=>Carbon::now()]);
            }
           
        }
    }