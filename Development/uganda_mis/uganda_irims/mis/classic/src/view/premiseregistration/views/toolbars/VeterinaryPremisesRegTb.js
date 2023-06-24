/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.premiseregistration.views.toolbars.VeterinaryPremisesRegTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'veterinarypremisesregtb',
    ui: 'footer',
    defaults: {
        //arrowAlign: 'bottom',
        ui: 'soft-green',
        iconAlign: 'top'
    },
    requires: [
        'Ext.ux.BoxReorderer'
    ],
    plugins: 'boxreorderer',
    overflowHandler: 'scroller',
    items: [
        {
            text: 'Home',
            iconCls: 'x-fa fa-home',
            name: 'drugsPremiseRegHomeBtn'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New Premise Registration',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewPremiseRegistration',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 1
                    },
                    '-',
                    {
                        text: 'Premise Renewal',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewPremiseRegistration',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 2
                    },
                    '-',
                    {
                        text: 'Premise Variation',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewPremiseRegistration',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 3
                    },
                    '-',
                    {
                        text: 'Premise Withdrawal (Closure of the business activities)',
                        iconCls: 'x-fa fa-check',
                        handler: 'showNewPremiseRegistration',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 4
                    },
                    '-',
                    {
                        text: 'Premise Application Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        handler: 'showDataCleanUpWindow',
                        wrapper: 'veterinarypremisesdashwrapper',
                        childXtype: 'editpremiseapp',
                        app_type: 4
                    }
                ]
            }
        },{
            text: 'Application Data Clean-Up',
            iconCls: 'x-fa fa-check',
            childXtype: 'editpremiseappwizard',
            wrapper: 'veterinarypremisesdashwrapper',
            handler: 'showDataCleanUpWindow',
        },'-',
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'New  Premise Registration Workflow Process',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 1
                    },
                    {
                        text: ' Premise Renewal  Workflow Process',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 2
                    },
                    {
                        text: ' Premise Alteration  Workflow Process',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 3
                    },
                    {
                        text: 'Premise Withdrawal  Workflow Process',
                        iconCls: 'x-fa fa-check',
                        handler: 'showPremiseRegWorkflow',
                        wrapper_xtype: 'veterinarypremisesdashwrapper',
                        app_type: 4
                    }
                ]
            }
        }
    ]
});