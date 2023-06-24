Ext.define('Admin.view.main.Main', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.kgs-main-app',
    xtype: 'main-app',
    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree',
        'Ext.ux.TabReorderer',
        'Ext.ux.TabCloseMenu'
    ],
    reference: 'main-app',
    controller: 'main',
    viewModel: 'main',
    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    listeners: {
        render: 'onMainViewRender',
        afterrender: 'afterMainPageRenders'
    },
    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: '<div class="main-logo"><img src="resources/images/logo.jpg" style="width: 50px;color: #000 !important; height: 50px; margin-left:0;">NDA iRIMS</div>',
                    width: 250
                },
                 {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-bars',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
           
                {
                  xtype: 'tbspacer',
                  width: 10
                },
                {
                    xtype: 'displayfield',
                    value: 'You are here:',
                    hidden: true,
                    fieldStyle: {
                        'font-weight':'bold',
                        'font-style':'italic',
                        'font-size':'10px'
                    }
                },
                {
                    xtype: 'displayfield',
                    value: 'Dashboard',
                    itemId: 'active_tab_display_id',
                    reference: 'active_tab_display_ref',
                    fieldStyle: {
                        'color':'darkblue',
                        'font-weight':'bold',
                        'font-size':'12px',
                        'margin': '17px 0 0 0'
                    }
                },
                {
                    iconCls: 'x-fa fa-refresh',
                    tooltip: 'Reload All Stores',
                    hidden: true,
                    handler: function () {
                        var appStores = Ext.StoreManager.getRange();
                        Ext.each(appStores, function (item) {
                            item.load();
                        });
                    }
                },
                '->',
                {
                    xtype: 'segmentedbutton',
                    margin: '0 16 0 0',

                    platformConfig: {
                        ie9m: {
                            hidden: true
                        }
                    },

                    items: [{
                        iconCls: 'x-fa fa-desktop',
                        pressed: true,
                        hidden: true
                    }, {
                        iconCls: 'x-fa fa-tablet',
                        handler: 'onSwitchToModern',
                        tooltip: 'Switch to modern toolkit',
                        hidden: true
                    }]
                },
                {
                    iconCls: 'x-fa fa-search',
                    ui: 'header',
                    href: '#searchresults',
                    hrefTarget: '_self',
                    tooltip: 'See latest search',
                    hidden: true
                },
                {
                    iconCls: 'x-fa fa-user',
                    text: 'Welcome ' + fullnames,
                    tooltip: 'Click to See your profile',
                    itemId: 'userProfile'
                },
                {
                    xtype: 'tbspacer'
                },
                {
                    iconCls: 'x-fa fa-user',
                    ui: 'header',
                    tooltip: 'See your profile',
                    //itemId: 'userProfile',
                    hidden: true
                },
                {
                    iconCls: 'x-fa fa-question',
                    ui: 'header',
                    tooltip: 'Help',
                    handler: 'showHelpManual',
                    hidden: true
                },
                {
                    iconCls: 'x-fa fa-meetup',
                    tooltip: 'Notifications',
                    name: 'tcmeeting_btn',badgeText: scheduledtcmeeting_counter,
                    text:' Scheduled Technical Meeting',
                    itemId: 'tcmeeting_btn'
                   // handler: 'funcViewScheduledTcMeetingDetails'
                }, {
                    iconCls: 'x-fa fa-bell',
                    //tooltip: 'My Assignments(Tasks)',badgeText: notifications_mytaskscounter,
                    tooltip: 'My Assignments(Tasks)',badgeText: scheduledtcmeeting_counter,
                    text:' My Current Assignment(s)',ui: 'soft-blue'
                    //handler: 'funcShowMyCurrentAssignment'
                    
                },
                {
                    iconCls: 'x-fa fa-bell',
                    //tooltip: 'Notifications',badgeText: notifications_duecounter,
                    tooltip: 'Notifications',badgeText: scheduledtcmeeting_counter,
                    text:' Service Delivery Timeline Notifications(OverDue Applications)',ui: 'soft-red'
                    //handler: 'funcShowServiceDeliveryTimesDuesDetails'
                    
                },
                {
                    iconCls: 'x-fa fa-unlock-alt',
                    //ui: 'header', 
                    text:'Change Password',
                    tooltip: 'Change Password',
                    handler: 'onChangePasswordClick'
                },
                {
                    iconCls: 'x-fa fa-sign-out',
                    text:' Log Out', 
                    tooltip: 'Log Out',
                    handler: 'onLogoutClick'
                },
                
                {
                    xtype: 'image',
                    cls: 'header-right-profile-image',
                    height: 35,
                    width: 35,
                    alt: 'Profile picture',
                    name: 'current_user_image',
                    itemId: 'current_user_image',
                    src: profile_pic_url
                },
                {
                    iconCls: 'x-fa fa-user',
                    text: fullnames,
                    listeners: {
                        mouseover: function () {
                            this.showMenu();
                        }
                    },
                    menu: {
                        xtype: 'menu',
                        width: 250,
                        items: [
                            {
                                iconCls: 'x-fa fa-user',
                                text: 'Profile',
                                //href: '#profile',
                                //hrefTarget: '_self',
                                tooltip: 'See your profile',
                                itemId: 'userProfile'
                            },
                            
                            {
                                text: 'Change Password',
                                iconCls: 'x-fa fa-unlock-alt',
                                action: 'change_password',
                                handler: 'onChangePasswordClick'
                            },
                            {
                                text: 'Log Out',
                                iconCls: 'x-fa fa-sign-out',
                                action: 'logout',
                                handler: 'onLogoutClick'
                            }]
                    }
                }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            // autoScroll: true,
            items: [{
                width: 250,
                minWidth: 64,
                maxWidth: 450,
                split: true,
                reference: 'treelistContainer',
                height: Ext.Element.getViewportHeight() - 50,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                resizable: true,
                autoScroll: true,
                overflowY: 'scroll',
                overflowX: 'scroll',

                bodyStyle: "background-color:#32404E;",
                items: [{
                    xtype: 'treelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    id: 'kgsnavtree', overflowY: 'scroll',
                    overflowX: 'scroll',
                    store: 'navigationstr',
                    expanderFirst: false,
                    expanderOnly: false,
                    singleExpand: true,
                    autoScroll:true,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                }]
            }, {
                split: true,
                xtype: 'tabpanel',
                flex: 1,
                height: Ext.Element.getViewportHeight() - 64,
                reference: 'mainCardPanel',
                cls: 'sencha-dash-right-main-container',
                itemId: 'contentPanel',
                plugins: [{
                    ptype: 'tabreorderer'
                }, {
                    ptype: 'tabclosemenu'
                }
                ],
                layout: {
                    type: 'card',
                    anchor: '100%'
                },
                autoScroll: true,
                listeners: {
                    beforetabchange: 'beforeTabChange',
                    beforeadd: function (tp, c, index) {
                        if (tp.items.length >= 8) {
                            Ext.Msg.alert('Many Tabs Opened Warning', 'You have opened many tabs, this can easily confuse you. Please close some of the unused tabs!!');
                        }
                    }
                },
                bodyStyle: 'background-color: #F1F1F1 !important',

                items: [{
                    title: 'Dashboard',
                    xtype: system_dashboard,
                    routeId: 'dashboard',
                    viewType: 'dashboard',
                    menu_id: 1,
                    reorderable: false
                }]
            }
            ]
        }
    ]
});
