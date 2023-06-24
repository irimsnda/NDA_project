/*Ext.define('Admin.view.profile.Social', {
    extend: 'Ext.panel.Panel',
    xtype: 'profilesocial',

    requires: [
        'Ext.Button',
        'Ext.Container'
    ],

    layout: {
        type: 'vbox',
        align: 'middle'
    },

    height: 320,
    
    bodyPadding: 20,
    
    items: [
        {
            xtype: 'image',
            cls: 'userProfilePic',
            height: 120,
            width: 120,
            alt: 'profile-picture',
            src: 'resources/images/user-profile/20.png'
        },
        {
            xtype: 'component',
            cls: 'userProfileName',
            height: '',
            html: 'Jessica Warren'
        },
        {
            xtype: 'component',
            cls: 'userProfileDesc',
            html: 'CO-FOUNDER, CEO'
        },
        {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                xtype: 'button',
                margin: 5
            },
            margin: 5,
            items: [
                {
                    ui: 'facebook',
                    iconCls: 'x-fa fa-facebook'
                },
                {
                    ui: 'soft-cyan',
                    iconCls: 'x-fa fa-twitter'
                },
                {
                    ui: 'soft-red',
                    iconCls: 'x-fa fa-google-plus'
                },
                {
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-envelope'
                }
            ]
        },
        {
            xtype: 'button',
            width: 220,
            text: 'Follow',
            platformConfig: {
                classic: {
                    scale: 'large'
                },
                modern: {
                    ui: 'action'
                }
            }
        }
    ]
});*/
Ext.define('Admin.view.profile.Social', {
    extend: 'Ext.form.Panel',
    xtype: 'profilesocial',

    requires: [
        'Ext.Button',
        'Ext.Container'
    ],

    layout: {
        type: 'vbox',
        align: 'middle'
    },
    // height: 320,
    bodyPadding: 20,
    items: [
        {
            xtype: 'image',
            cls: 'userProfilePic',
            height: 120,
            width: 120,
            name: 'user_photo',
            alt: 'profile-picture',
            //src: 'resources/images/placeholder.png',
            src: profile_pic_url
        },
        {
            xtype: 'component',
            cls: 'userProfileName',
            height: '',
            html: fullnames
        },
        {
            xtype: 'component',
            cls: 'userProfileDesc',
            html: user_role_description
        },
        {
            xtype: 'profiledescription'
        },
        {
            xtype: 'panel',
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'id',
                    value: user_id
                },
                {
                    xtype: 'button',
                    text: 'Update Information',
                    menu: {
                        xtype: 'menu',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Profile Information',
                                handler: function () {
                                    var win = Ext.widget('profileupdate_win');
                                    Ext.getStore('userTitlesStore').load();
                                    Ext.getStore('genderStore').load();
                                    win.show();
                                }
                            },
                            {
                                xtype: 'filefield',
                                name: 'profile_photo',
                                buttonText: 'Profile Picture',
                                itemId: 'updateprofilepic'
                            }
                        ]
                    }
                }
            ]
        }
    ]
});

