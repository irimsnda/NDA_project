/**
 * Created by Kip on 11/10/2018.
 */
Ext.define('Admin.view.premiseregistration.views.panels.PremisesInspectionProcessWizard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.premisesinspectionprocesswizard',
    controller: 'premiseregistrationvctr',
    viewModel: 'premiseregistrationvm',
    padding: '2 0 2 0',
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
        /*{
            title: 'Inspection Checklists',
            region: 'center',
            layout: 'fit',
            items: [
                {
                    xtype: 'premisescreeninggrid'
                }
            ]
        },*/{
            xtype: 'premisesinspectionrecommendationfrm'
        },{
           
            xtype:'legalityofstockprdpnl'
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
               /* {
                    step: 0,
                    iconCls: 'fa fa-user',
                    enableToggle: true,
                    pressed: true,
                    text: 'Inspection Checklist',
                    action: 'quickNav',
                    handler: 'quickInspectionNavigationMoreDetails'
                },*/ {
                    step: 0,
                    iconCls: 'fa fa-university',
                    enableToggle: true,
                    text: 'Inspection Details & Recommendation',
                    action: 'quickNav',
                    handler: 'quickInspectionNavigationMoreDetails'
                },
                {
                    step: 1,
                    iconCls: 'fa fa-upload',
                    enableToggle: true,
                    text: 'Legality of stocked products ',
                    action: 'quickNav',
                    handler: 'quickInspectionNavigationMoreDetails'
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
                    handler: 'onPrevInspectionCardClickMoreDetails'
                },
                '->',
                
                {
                    text: 'Next',
                    ui: 'soft-purple',
                    reference: 'nextbutton',
                    iconCls: 'fa fa-arrow-right',
                    iconAlign: 'right',
                    bind: {
                        disabled: '{atEnd}'
                    },
                    handler: 'onNextInspectionCardClickMoreDetails'
                }
            ]
        };
        me.callParent(arguments);
    }
});
