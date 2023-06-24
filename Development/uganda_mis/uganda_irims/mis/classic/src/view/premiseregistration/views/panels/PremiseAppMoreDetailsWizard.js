/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseAppMoreDetailsWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.premiseappmoredetailswizard',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    padding: '2 0 2 0',
    requires: [
        'Ext.layout.container.*',
        'Ext.toolbar.Fill'
    ],
    reference: 'wizardpnl',
    layout:'fit',
    flex: 1,autoScroll: true, 
    autoScroll: true,
    cls: 'wizardthree shadow',
    colorScheme: 'soft-green',
    tbar:[{
        xtype: 'hiddenfield',
        name: 'process_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'workflow_stage_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'application_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'sub_module_id'
    },
    {
        xtype: 'hiddenfield',
        name: 'section_id'
    }],
    items: [{
            xtype: 'premisedetailswintabpnl',
            title:'Premises, Personnel and Activities Details',
            layout:'fit'
        },
        {
            xtype: 'applicationapplicantpnl',
            collapsible: true, 
           collapsed: true,hidden: true,
            title:'Premises Applicant Details'
        }
    ],
    bbar:[{
        text: 'Update Application Details',
        ui: 'soft-purple',
        iconCls: 'fa fa-save',
        name: 'updatepremisesapplications',
        toaster: 1
    }]
/*
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
                    handler: 'quickNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'PREMISE DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationMoreDetails'
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
                    handler: 'onPrevCardClickMoreDetails'
                },
                '->',
                {
                    text: 'Update Application Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
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
                    },
                    handler: 'onNextCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
    */
});
