/**
 * Created by Kip on 12/11/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremiseAlterationCompareDetails', {
    extend: 'Ext.panel.Panel',
    height: 550,
    alias: 'widget.premisealterationcomparedetails',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
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
            xtype: 'premisevariationrequestsonlinegrid'//'amendmentscomparepnl'
        },
        {
            xtype: 'premisemaindetailscomparepnl'
        },
        {
            xtype: 'premisepersonneldetailscomparepnl'
        },
        {
            xtype: 'premiseotherdetailscomparepnl'
        },
        {
            xtype: 'hiddenfield',
            name: 'process_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'workflow_stage_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_id'
        },
        {
            xtype: 'hiddenfield',
            name: 'active_application_code'
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
                    iconCls: 'fa fa-folder-open-o',
                    enableToggle: true,
                    pressed: true,
                    text: 'AMENDMENT/VARIATION REQUESTS',
                    action: 'quickNav',
                    handler: 'quickNavigationCompareDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'MAIN DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationCompareDetails'
                },
                {
                    step: 2,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    text: 'PERSONNEL DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationCompareDetails'
                },
                {
                    step: 3,
                    iconCls: 'fa fa-arrows-alt',
                    enableToggle: true,
                    text: 'BUSINESS DETAILS',
                    action: 'quickNav',
                    handler: 'quickNavigationCompareDetails'
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
                    handler: 'onPrevCardClickCompareDetails'
                },
                '->',
                {
                    text: 'Save Premise Main Details',
                    ui: 'soft-purple',
                    iconCls: 'fa fa-save',
                    name: 'save_btn',
                    toaster: 1,
                    disabled: true,
                    hidden: true
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
                    handler: 'onNextCardClickCompareDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
