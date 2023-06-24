Ext.define('Admin.view.authentication.Login', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'login',
    header: false,
    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button',
        'Admin.global.GlobalVars'
    ],
    //title: 'MIS',
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
         mode : 'image',
         bodyStyle:{
            'background-image': 'url(resources/images/bg_img.png); background-repeat: no-repeat;background-position: fit;'
        },  
    autoScroll: true,
    listeners: {
        afterrender: 'afterLoginPageRenders'
    },
    
    items: [{
        xtype: 'container',
        width: '40%',
        layout: 'responsivecolumn', bodyPadding: '10 10',
        items: [{
                xtype: 'panel',
                userCls: 'big-100 small-100',
                minHeight: 150,
                itemId: 'loginMetaId',
                bodyStyle : {  "opacity" : "0.8" },
                layout : { type : 'vbox', align : 'right', pack : 'center' },
                defaults : { width : '100%' },
                items: [
                    {
                        bodyStyle : {  "text-align" : "right" },
                        xtype : 'image',
                        style :
                            'background-image:url(resources/images/system_title.png);height: 175px !important; background-repeat: no-repeat;background-position: center;',
                        mode : 'image',
                        height : 150
                    }
                ]

            }, {
                xtype: 'panel',
                itemId: 'winFormsPanel',
                userCls: 'big-100 small-100',
                layout: {
                    type: 'card'
                },
                items: [{
                    xtype: 'authdialog',
                    defaultButton: 'loginButton',
                    autoComplete: true,
                    bodyPadding: '5 5',
                   cls: 'auth-dialog-login',
                    header: false,
                    width: 500,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },

                    defaults: {
                        margin: '5 0'
                    },

                    items: [
                        {
                            xtype: 'label',
                            style: {
                                'font-weight': 'bold',
                                'font-size': '18px'
                            },
                            text: 'LOGIN'
                        },
                        {
                            xtype: 'textfield',
                            value: token,
                            name: '_token',
                            hidden: true
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            name: 'email',
                            bind: '{userid}',
                            height: 55,
                            hideLabel: true,
                            allowBlank: false,
                            emptyText: 'Email Address',
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-email-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            cls: 'auth-textbox',
                            height: 55,
                            hideLabel: true,
                            emptyText: 'Password',
                            inputType: 'password',
                            name: 'password',
                            bind: '{password}',
                            allowBlank: false,
                            triggers: {
                                glyphed: {
                                    cls: 'trigger-glyph-noop auth-password-trigger'
                                }
                            }
                        },
                        {
                            xtype: 'container',
                            layout: 'hbox',
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    flex: 1,
                                    cls: 'form-panel-font-color rememberMeCheckbox',
                                    height: 30,
                                    bind: '{persist}',
                                    boxLabel: 'Remember me',
                                    name: 'remember_me',
                                    inputValue: 1//submitValue
                                },
                                {
                                    xtype: 'box',
                                    html: '<a href="#passwordreset" class="link-forgot-password" onclick="event.preventDefault()"> Forgot Password ?</a>',
                                    listeners: {
                                        el: {
                                            delegate: 'a',
                                            click: 'onResetPasswordClick'
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            xtype: 'button',
                            reference: 'loginButton',
                            scale: 'large',
                            ui: 'soft-green',
                            iconAlign: 'right',
                            iconCls: 'x-fa fa-sign-in',
                            text: 'Login',
                            formBind: true,
                            listeners: {
                                click: 'onLoginButton'
                            }
                        }]
                },
                    //email for password reset
                    {
                        xtype: 'authdialog',
                        defaultButton: 'loginButton',
                        autoComplete: true,
                        bodyPadding: '20 20',
                        cls: 'auth-dialog-login',
                        header: false,
                        width: 500,
                        layout: {
                            type: 'vbox',
                            align: 'stretch'
                        },

                        defaults: {
                            margin: '5 0'
                        },

                        items: [
                            {
                                xtype: 'label',
                                text: 'Enter your email address for further reset instructions!!',
                                style: {
                                    'font-weight': 'bold',
                                    'font-size': '14px'
                                }
                            },
                            {
                                xtype: 'textfield',
                                value: token,
                                name: '_token',
                                hidden: true
                            },
                            {
                                xtype: 'textfield',
                                cls: 'auth-textbox',
                                name: 'email',
                                height: 55,
                                hideLabel: true,
                                allowBlank: false,
                                emptyText: 'Registered Email Address',
                                triggers: {
                                    glyphed: {
                                        cls: 'trigger-glyph-noop auth-envelope-trigger'
                                    }
                                }
                            },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                items: [
                                    {
                                        xtype: 'box',
                                        html: '<a href="#login" class="link-forgot-password" onclick="event.preventDefault()"><i class="x-fa fa-angle-left"></i> Back to Log In</a>',
                                        listeners: {
                                            el: {
                                                delegate: 'a',
                                                click: 'onLoginClick'
                                            }
                                        }
                                    }
                                ]
                            },
                            {
                                xtype: 'button',
                                reference: 'resetPassword',
                                scale: 'large',
                                ui: 'soft-green',
                                formBind: true,
                                iconAlign: 'right',
                                iconCls: 'x-fa fa-angle-right',
                                text: 'Reset Password',
                                listeners: {
                                    click: 'onResetPwdClick'
                                }
                            }
                        ]
                    }
                ]
            }]

    }],

    initComponent: function () {
        this.addCls('user-login-register-container');
        this.callParent(arguments);
    }
});
