/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.toolbars.DrugsSurveillanceTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'drugssurveillancetb',
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
            name: 'drugsSurveillanceHomeBtn',
            dash_wrapper: 'drugssurveillancedashwrapper',
            dashboard: 'drugssurveillancedashwrapper'
        },
        {
            text: 'PMS Application Initialisation',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'PMS Implementation Plan Sample Collection and Review',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'drugssurveillancedashwrapper',
                        handler:'showNewPmsApplication',
                        app_type: 38
                    },
                    '-',
                    {
                        text: 'Normal PMS Sample Collection and Analysis',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'drugssurveillancedashwrapper',
                        handler:'showNewPmsApplication',
                        app_type: 37
                    }
                ]
            }
        },{
            text: 'Program Plan Implementation Details',
            iconCls: 'x-fa fa-folder',
            handler:'funcPreviewProgramImplDetails',
            winTitle: 'Program Plan Implementation Details',
            winWidth:'90%',
            childObject:'programimplementationdetailsgrid'
        },
        '->',
        
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'Structured Surveillance',
                        iconCls: 'x-fa fa-check',
                        handler:'showPmsApplicationWorkflow',
                        wrapper_xtype: 'drugssurveillancedashwrapper',
                        app_type: 38
                    },
                    {
                        text: 'Non-Structured Surveillance',
                        iconCls: 'x-fa fa-check',
                        handler:'showPmsApplicationWorkflow',
                        wrapper_xtype: 'drugssurveillancedashwrapper',
                        app_type: 37
                    }
                ]
            }
        }
    ]
});