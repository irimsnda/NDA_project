/**
 * Created by Kip on 2/2/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.maininterfaces.ReceivingSafetyInformationCommunicationWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.receivingsafetyinformationcommunicationwizard',
    viewModel: 'pharmacovigilancevm',
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

    items: [{
            xtype: 'safetyinformationcommunicationspnl'
        },
        {
            xtype: 'clinicaltrialdocuploadsgenericgrid'
        },
        {
            xtype: 'productscreeninggrid'
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
            items: [ {
                    step: 0,
                    iconCls: 'fa fa-suitcase',
                    enableToggle: true,iconAlign:'top',
                    text: 'SAFETY ALERT REPORTING DETAILS',
                    wizard_pnl: 'receivingsafetyalertreportswizard',
                    max_step: 2,
                    action: 'quickNav'
                },{
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,iconAlign:'top',
                    text: 'SAFETY ALERT REPORTING DOCUMENT UPLOADS',wizard_pnl: 'receivingsafetyalertreportswizard',
                    max_step: 2,
                    action: 'quickNav'
                },{
                    step: 2,
                    iconCls: 'fa fa-check-square',
                    enableToggle: true,iconAlign:'top',
                    text: 'PRE-CHECKING',wizard_pnl: 'receivingsafetyalertreportswizard',
                    max_step: 2,
                    action: 'quickNav'
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
                    },wizard_pnl: 'receivingsafetyalertreportswizard',
                    max_step: 2,
                    name: 'prev_btn'
                },
                {
                    xtype: 'transitionsbtn'
                },
                
                '->',
                
                {
                    text: 'Save Clinical Trial Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    // saveSafetyAlertReportsDetails
                    toaster: 1
                },
                
               {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },wizard_pnl: 'receivingsafetyalertreportswizard',
                    max_step: 2,
                    name: 'next_btn'
                },{
                    text: 'Submit Application',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-check', hidden: true,
                    name: 'process_submission_btn',
                    storeID: 'clinicaltrialstr',
                    table_name: 'tra_clinical_trial_applications',
                    winWidth: '50%',
                    toaster: 0
                }
            ]
        };
        me.callParent(arguments);
    }
});
