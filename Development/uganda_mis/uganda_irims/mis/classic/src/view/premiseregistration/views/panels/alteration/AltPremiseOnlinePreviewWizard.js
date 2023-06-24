/**
 * Created by Kip on 5/28/2019.
 */
Ext.define('Admin.view.premiseregistration.views.panels.alteration.AltPremiseOnlinePreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.altpremiseonlinepreviewwizard',
    padding: '2 0 2 0',
    name: 'wizardPanel',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    //bodyPadding: 3,
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'onlinepremisedetailswintabpnl'
        },
        {
            xtype: 'premregonlinedocuploadsgenericgrid'
        },
        {
            xtype: 'premisevariationrequestsonlinegrid'
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            defaultButtonUI: 'wizard-' + this.colorScheme,
            cls: 'wizardprogressbar',
            bodyStyle: {
                "background-color": "red"
            },
            layout: {
                pack: 'center'
            },
            items: [
                {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'APPLICANT DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineCancelAlt'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'PREMISE DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineCancelAlt'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnlineCancelAlt'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-close',
                    enableToggle: true,
                    text: 'VARIATION REQUESTS',
                    handler: 'quickNavigationOnlineCancelAlt'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    handler: 'onPrevCardClickOnlineCancelAlt'
                },
                '->',
                {
                    text: 'Actions',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-bars',
                    name: 'actions',
                    hidden: true,
                    menu:{
                        xtype: 'menu',
                        items:[
                            {
                                text: 'Dismiss Rejection And Receive Application',
                                iconCls: 'x-fa fa-arrow-right',
                                name: 'action_dismiss1',
                                handler: 'receiveOnlineApplicationDetailsFrmBtn',
                                storeID: 'onlinepremregistrationstr',
                                winWidth: '50%'
                            },
                            '-',
                            {
                                text: 'Dismiss Rejection And Send To Rejecting Officer',
                                iconCls: 'x-fa fa-arrow-right',
                                name: 'action_dismiss2',
                                handler: 'submitManagerRejectedOnlineApplicationFrmBtn',
                                application_status: 24
                            },
                            '-',
                            {
                                text: 'Approve Rejection And Send Application To Trader',
                                iconCls: 'x-fa fa-arrow-right',
                                name: 'action_approve',
                                handler: 'submitManagerRejectedOnlineApplicationFrmBtn',
                                application_status: 18
                            }
                        ]
                    }
                },
                {
                    text: 'Previous Rejections',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-down',
                    hidden: true,
                    name: 'prev_rejections',
                    handler: 'showOnlineApplicationRejections',
                    childXtype: 'onlineappsrejectionsgrid',
                    winWidth: '60%'
                },
                {
                    text: 'Receive Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-up',
                    name: 'receive_btn',
                    //handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlinepremregistrationstr',
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Query Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-sliders',
                    name: 'query_btn',
                    handler: 'queryOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-thumbs-down',
                    name: 'reject_btn',
                    //handler: 'submitRejectedOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    handler: 'onNextCardClickOnlineCancelAlt'
                }
            ]
        };
        me.callParent(arguments);
    }
});
