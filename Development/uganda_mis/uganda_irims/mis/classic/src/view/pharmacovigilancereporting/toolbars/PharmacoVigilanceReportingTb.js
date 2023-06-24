/**
 * Created by Kip on 1/15/2019.
 */
Ext.define('Admin.view.pharmacovigilancereporting.views.toolbars.PharmacoVigilanceReportingTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'pharmacovigilancereportingtb',
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
            name: 'pharmacovigilancereportingbtn',
            dash_wrapper: 'pharmacovigilancereportingdashwrapper',
            dashboard: 'pharmacovigilancereportingdashwrapper'
        },
        {
            text: 'Application Initialisation (PharmacoVigilance Reporting & Inspection)',
            iconCls: 'x-fa fa-plus-square',
            menu: {
                xtype: 'menu',
                items: [
                    {
                        text: 'Signal Alert reporting',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 73
                    }, {
                        text: 'Safety Information Communication',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 74
                    },
                    '-',
                    {
                        text: 'PV Inspections(Pharmacovigelnce plan on registered products)',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 72
                    },{
                        text: 'Periodic Benefit risks evaluation report(PSUR/PBRES/DSUR)',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 75
                    },{
                        text: 'ADR Assessment, Monitoring & Reporting',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 77
                    },
                    '-',{
                        text: 'Register for Qualified Person for PharmacoVigilance',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        handler:'showNewClinicalTrialApplication',
                        app_type: 76
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
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        app_type: 10
                    },
                    {
                        text: 'Amendment Application',
                        iconCls: 'x-fa fa-check',
                        handler:'showClinicalTrialApplicationWorkflow',
                        wrapper_xtype: 'pharmacovigilancereportingdashwrapper',
                        app_type: 11
                    }
                ]
            }
        }
    ]
});