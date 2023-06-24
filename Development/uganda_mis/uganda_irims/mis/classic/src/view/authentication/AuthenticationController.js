Ext.define('Admin.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin: function () {
        this.redirectTo('dashboard', true);
    },

    onResetPasswordClick: function () {
        var winFormsPanel = this.getView().up('#winFormsPanel'),
            win = winFormsPanel.up('window'),
            loginMetaPnl = win.down('#loginMetaId');
        this.getView().up('#winFormsPanel').getLayout().setActiveItem(1);
        loginMetaPnl.setMinHeight(250);
    },

    onLoginClick: function () {
        var winFormsPanel = this.getView().up('#winFormsPanel'),
            win = winFormsPanel.up('window'),
            loginMetaPnl = win.down('#loginMetaId');
        this.getView().up('#winFormsPanel').getLayout().setActiveItem(0);
        loginMetaPnl.setMinHeight(300);
    },

    onLoginButton: function (btn) {
        var form = btn.up('form'),
            frm = form.getForm(),
            win = btn.up('window');
        if (frm.isValid()) {
            frm.submit({
                dataType: 'JSON',
                url: 'login',
                method: 'POST',
                waitTitle: 'Connecting',
                waitMsg: 'Authenticating Credentials...',

                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        message = response.message;
                    toastr.success(message, "Logged In!!");
                    setTimeout(function () {
                        location.reload();
                    }, 100);
                },
                failure: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        message = response.message,
                        status = action.response.status;
                    toastr.error(message, 'Failure Response');
                    if (status == 400) {
                        // toastr.error('Reload page', 'Your ');
                    }
                    if (action.failureType == 'server') {
                        //toastr.error(message, 'Login failed!');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    toastr.error('Error: ' + errorThrown, 'Error Response');
                }
            });
        }
    },

    onLoginAsButton: function () {
        this.redirectTo('login', true);
    },

    onNewAccount: function () {
        this.redirectTo('register', true);
    },

    onSignupClick: function () {
        this.redirectTo('dashboard', true);
    },

    onResetClick: function () {
        this.redirectTo('dashboard', true);
    },

    afterLoginPageRenders: function () {
        var mask = Ext.get('loading-mask');
        mask.fadeOut({
            callback: function () {
                mask.destroy();
            }
        });
    },

    reValidateUser: function (btn) {
        var me = this,
            form = btn.up('form'),
            frm = form.getForm(),
            win = form.up('window'),
            lock_win = form.up('lockingwindow');
        if (frm.isValid()) {
            frm.submit({
                url: 'reValidateUser',
                method: 'POST',
                waitTitle: 'Connecting',
                waitMsg: 'Authenticating Credentials...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        success = response.success,
                        message = response.message;
                    if (success == true || success === true) {
                        toastr.success(message, "Success Response");
                        win.close();
                        closeActiveWindow();
                        lock_win.close();
                        checkUserSessionValidity(900000);
                    } else {
                        toastr.warning(message, 'Failure Response');
                    }
                },
                failure: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        message = response.message;
                    toastr.warning(message, 'Failure Response');
                }
            });
        }
    },

    onResetPwdClick: function (btn) {
        //this.redirectTo('dashboard', true);
        var me = this,
            form = btn.up('form'),
            frm = form.getForm();
        if (frm.isValid()) {
            frm.submit({
                dataType: 'JSON',
                url: 'forgotPassword',
                method: 'POST',
                waitTitle: 'Connecting',
                waitMsg: 'Sending email link...',
                success: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        message = response.message;
                    toastr.success(message, "Success Response");
                    setTimeout(function () {
                        me.onLoginClick();
                    }, 50);
                },
                failure: function (form, action) {
                    var response = Ext.decode(action.response.responseText),
                        message = response.message;
                    if (action.failureType == 'server') {
                        toastr.error(message, 'Failure Response!');
                        //Ext.Msg.alert('Login failed!', 'Login data is incorrect!');
                    } else {
                        toastr.error('Error!', 'The authentication server is not responding : ' + action.response.responseText);
                        //Ext.Msg.alert('Warning!', 'The authentication server is not responding : ' + action.response.responseText);
                    }

                    //frm.reset();
                }
            });
        }
    },

    onSaveNewPassword: function (btn) {
        var form = btn.up('form'),
        new_password = form.down('textfield[name=new_password]').getValue(),
            frm = form.getForm(),
            pass_response = pass_complexcheck(new_password),
            error_message = pass_response.error_message
            response = pass_response.response;

            if(response){
                    if (frm.isValid()) {
                            frm.submit({
                                dataType: 'JSON',
                                url: 'saveNewPassword',
                                method: 'POST',
                                waitTitle: 'Connecting',
                                waitMsg: 'Saving new password...',
                                success: function (form, action) {
                                    var response = Ext.decode(action.response.responseText),
                                        message = response.message;
                                    toastr.success(message, "Success Response");
                                    Ext.Function.defer(function () {
                                        location.href = base_url;
                                    }, 500);
                                },
                                failure: function (form, action) {
                                    var response = Ext.decode(action.response.responseText),
                                        message = response.message;
                                    if (action.failureType == 'server') {
                                        toastr.error(message, 'Failure Response!');
                                    } else {
                                        toastr.error('Error!', 'The authentication server is not responding : ' + action.response.responseText);
                                        
                                    }
                                }
                            });
                        }

            }
            else{
                var message = "Password doesn't comform to the complexity policy, it must have "+error_message;
                toastr.error(message, 'Failure Response');
            }

       
    },
    
     onLogoutClick: function (btn) {
        //logout user from MIS
        var form = Ext.create('Ext.form.Panel', {}),
            frm = form.getForm();
        this.redirectTo('dashboard', true);
        frm.submit({
            url: 'logout',
            headers: {
                'X-CSRF-Token': token
            },
            waitMsg: 'Logging out, Please wait...',
            success: function (fm, action) {
                setTimeout(function () {
                    location.reload();
                }, 100);
            },
            failure: function (fm, action) {
                var resp = action.result;
                toastr.error(resp.message, 'Failure Response');
            }
        });
    },

});