/**
 * Created by Kip on 11/21/2018.
 */
Ext.define('Admin.view.drugshopregistration.views.panels.NewDrugShopOnlinePreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.newdrugshoponlinepreviewwizard',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    name: 'wizardPanel',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
       {
            xtype: 'applicationapplicantpnl'
        },
        {
            xtype: 'drugshopdetailstabpnl'
        },
        {
            xtype: 'premregonlinedocuploadsgenericgrid'
        },
        {
            xtype: 'premiseonlinescreeninggrid'//'premisescreeninggrid'
        }
    ],

    initComponent: function () {
        var me = this;
        this.tbar = {
            reference: 'progress',
            itemId: 'progress_tbar',
            name: 'progress_tbar',
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
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'DRUG SHOP DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'PRE-CHECKING',
                    action: 'quickNav',
                    handler: 'quickNavigationOnline'
                }
            ]
        };
        this.bbar = {
            reference: 'navigation-toolbar',
            name: 'navigation-toolbar',
            ui: 'footer',
            items: [
                {
                    text: 'Previous',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-arrow-left',
                    bind: {
                        disabled: '{atBeginning}'
                    },
                    handler: 'onPrevCardClickOnline'
                },
                {
                    text: 'Preview Queries/Responses',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-bars',
                    name: 'preview_queries_btn'
                },
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
                                //handler: 'receiveOnlineApplicationDetailsFrmBtn',
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
                    text: 'Query Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-sliders',
                    name: 'query_btn',
                    hidden: true,
                    handler: 'queryOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                {
                    text: 'Reject Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-down',
                    name: 'reject_btn',
                    hidden: true,
                    
                    handler: 'submitRejectedOnlineApplicationFrmBtn',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                },
                '->',
                {
                    text: 'Save Pre-Checking Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_screening_btn',
                    disabled: true
                }, {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    name: 'submit_btn',
                    is_invoicecheck:false,
                    //handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlinepremregistrationstr',
                    winWidth: '50%',
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
                    handler: 'onNextCardClickOnline'
                }
            ]
        };
        me.callParent(arguments);
    }
});
