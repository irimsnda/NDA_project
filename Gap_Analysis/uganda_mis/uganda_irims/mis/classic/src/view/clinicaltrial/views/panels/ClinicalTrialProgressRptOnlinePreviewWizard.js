/**
 * Created by Kip on 2/5/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialProgressRptOnlinePreviewWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.clinicaltrialprogressrptonlinepreviewwizard',
    controller: 'clinicaltrialvctr',
    viewModel: 'clinicaltrialvm',
    name: 'wizardPanel',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout: 'card',
    flex: 1,
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',

    items: [
        {
            xtype: 'clinicaltrialapplicantpnl'
        },
        {
            xtype: 'clinicaltrialsprogressrptdetailspnl'
        },{
            xtype: 'clinicaltrialonlinedocuploadsgenericgrid'
        },
        {
            xtype: 'clinicaltrialonlinescreeninggrid'
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
                    handler: 'quickNavigationProgressRptOnlineDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,
                    text: 'CLINICAL TRIAL PROGRESS REPORTING DETAILS ',
                    action: 'quickNav',
                    handler: 'quickNavigationProgressRptOnlineDetails'
                },
                
                {
                    step: 2,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'DOCUMENT UPLOADS',
                    action: 'quickNav',
                    handler: 'quickNavigationProgressRptOnlineDetails'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,
                    text: 'PRE-CHECKING',
                    action: 'quickNav',
                    handler: 'quickNavigationProgressRptOnlineDetails'
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
                    name: 'prev_btn',
                    handler: 'onPrevCardClickProgressRptOnlineDetails'
                },
                {
                    text: 'Preview Queries/Responses',
                    ui: 'soft-purple',
                    hidden: true,
                    iconCls: 'x-fa fa-bars',
                    name: 'preview_queries_btn'
                },
               
                {
                    text: 'Query Application',
                    ui: 'soft-purple',
                    hidden: true,
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
                    iconCls: 'x-fa fa-thumbs-down',
                    name: 'reject_btn',
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
                    text: 'Receive Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-thumbs-up',
                    hidden: true,
                    name: 'receive_btn',
                    handler: 'receiveOnlineApplicationDetailsFrmBtn',
                    storeID: 'onlineclinicaltrialstr',
                    winWidth: '50%',
                    bind: {
                        disabled: '{!atEnd}'
                    }
                }, 
                {
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'x-fa fa-check',
                    name: 'submit_btn',
                    storeID: 'onlineclinicaltrialstr',
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
                    name: 'next_btn',
                    handler: 'onNextCardClickProgressRptOnlineDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
