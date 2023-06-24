Ext.define('Admin.view.authentication.ResetPwdScreen', {
    extend: 'Admin.view.authentication.LockingWindow',
    xtype: 'resetpwdscreen',

    requires: [
        'Admin.view.authentication.Dialog',
        'Ext.container.Container',
        'Ext.form.field.Text',
        'Ext.form.field.Checkbox',
        'Ext.button.Button'
    ],
    header: false,
    defaultFocus: 'authdialog', // Focus the Auth Form to force field focus as well
    listeners: {
        afterrender: function (t, eOpts) {
            var mask = Ext.get('loading-mask');
                //parent = Ext.get('loading-parent');
            mask.fadeOut({
                callback: function () {
                    mask.destroy();
                }
            });
          /*  parent.fadeOut({
                callback: function () {
                    parent.destroy();
                }
            });*/
        }
    },
    items: [
        {
            xtype: 'container',
            width: '56%',
            layout: 'responsivecolumn',
            items: [{
                xtype: 'panel',
                title: 'TFDA MIS 2.0 - LOGIN',
                headerStyle: {"background-color": "#1E6912", "opacity": "0.8"},
                userCls: 'big-100 small-100'
            },
                {
                    xtype: 'panel',
                    userCls: 'big-40 small-100',
                    minHeight: 300,
                    itemId: 'loginMetaId',

                    bodyStyle: {"background-color": "#F9F9F9", "opacity": "0.8"},
                    layout: {type: 'vbox', align: 'center', pack: 'center'},
                    defaults: {width: '100%'},
                    items: [
                        {
                            bodyStyle: {"background-color": "#F/9F9F9", "text-align": "center"},
                            xtype: 'image',
                            style:
                                'background-image:url(resources/images/logo.jpg); background-repeat: no-repeat;background-position: center;',
                            // src: 'resources/images/logo.jpg',
                            mode: 'image',
                            height: 120
                        },
                        {
                            itemId: 'version_meta',
                            // html: '<h3 style="color:black; font-size:13px; text-align: center">Tanzania Food and Drugs Authority<br>Integrated Management Information System<br/><small>Version: <span style="color: #3366ff">Rev 0 [F:' + Admin.global.GlobalVars.extVersion + ',B:' + backendVersion + ']</span> <i class="x-fa fa-copyright" style="font-size: 11px"></i> 2018 </small><\h3>'

                            bodyStyle: {"background-color": "#F9F9F9", "line-height": "25px"},
                            html: '<h3 style="line-height: 2;color:black; font-size:12px; text-align: center">' +
                            org_name + ' ' + iso_cert + '<br>' + ministry_name + '<br>' + system_name + '<br><small>' +
                            system_version + '</small></h3>',
                            // height: 170
                        }
                    ]

                },
                {
                    xtype: 'panel',
                    itemId: 'winFormsPanel',
                    userCls: 'big-60 small-100',
                    layout: {
                        type: 'card'
                    },
                    items: [
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
                                margin: '5 0',
                                allowBlank: false,
                                msgTarget: 'under'
                            },

                            items: [
                                {
                                    xtype: 'label',
                                    text: 'Set your new password!!',
                                    style: {
                                        'color': 'red'
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
                                    value: guid,
                                    name: 'guid',
                                    hidden: true
                                },
                                {
                                    xtype: 'textfield',
                                    cls: 'auth-textbox',
                                    name: 'new_password',
                                    id: 'pass',
                                    height: 55,
                                    hideLabel: true,
                                    allowBlank: false,
                                    emptyText: 'New Password',
                                    inputType: 'password',
                                    blankText: "Enter your new password",
                                    triggers: {
                                        glyphed: {
                                            cls: 'trigger-glyph-noop auth-password-trigger'
                                        }
                                    }
                                },
                                {
                                    xtype: 'textfield',
                                    cls: 'auth-textbox',
                                    name: 'confirm_new_password',
                                    inputType: 'password',
                                    id: 'pass2',
                                    vtype: 'password',
                                    initialPassField: 'pass',
                                    height: 55,
                                    hideLabel: true,
                                    allowBlank: false,
                                    emptyText: 'Confirm New Password',
                                    blankText: "Confirm your new password",
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
                                            xtype: 'box',
                                            html: '<a href="#login" class="link-forgot-password" onclick="event.preventDefault()"><i class="x-fa fa-angle-left"></i> Back to Log In</a>',
                                            listeners: {
                                                el: {
                                                    delegate: 'a',
                                                    click: 'onBackToLoginClick'
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'button',
                                    reference: 'resetPassword',
                                    scale: 'large',
                                    ui: 'soft-blue',
                                    formBind: true,
                                    iconAlign: 'right',
                                    iconCls: 'x-fa fa-save',
                                    text: 'Save New Password',
                                    listeners: {
                                        click: 'onSaveNewPassword'
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
