/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.toolbars.ClinicalTrialTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'clinicaltrialtb',
    ui: 'footer',
    defaults: {
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
            name: 'clinicalTrialHomeBtn',
            dash_wrapper: 'clinicaltrialdashwrapper',
            dashboard: 'clinicaltrialdashwrapper'
        },
        {
            text: 'Application Initialisation (Clinical Application)',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                     {
                        text: 'Peer Pre-Clinical Trial',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 69
                    },
                    {
                        text: 'New Application',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 10
                    },
                    '-',
                    {
                        text: 'Amendment Application',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 11
                    },{
                        text: 'Application Query Response',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        childXtype: 'queryResponseclinicaltrial',
                        handler:'showDataCleanUpWindow',
                        app_type: 24
                    }
                ]
            }
        }, {
            text: 'GCP Inspection Application',
            iconCls: 'x-fa fa-check',
            wrapper_xtype: 'clinicaltrialdashwrapper',
            handler:'showNewClinicalTrialApplication',
            app_type: 24
        },
        {
            text: 'Clinical Trial Data-Cleanup Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    ,'-',
                   '-',
                    {
                        text: 'Application Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        childXtype: 'editclinicaltrialreceiving',
                        handler:'showDataCleanUpWindow',
                        app_type: 24
                    },'-',
                    '-',
                    {
                        text: 'Clinical Trial Registry Data Clean-Up',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        childXtype: 'editclinicaltrialregistryreceiving',
                        handler:'showClinicalRegDataCleanUpWindow',
                        app_type: 24
                    }
                ]
            }
        },
        '->',
       
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'New Application',
                        iconCls: 'x-fa fa-check',
                        handler:'showClinicalTrialApplicationWorkflow',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        app_type: 10
                    },
                    {
                        text: 'Amendment Application',
                        iconCls: 'x-fa fa-check',
                        handler:'showClinicalTrialApplicationWorkflow',
                        wrapper_xtype: 'clinicaltrialdashwrapper',
                        app_type: 11
                    }
                ]
            }
        }
    ]
});