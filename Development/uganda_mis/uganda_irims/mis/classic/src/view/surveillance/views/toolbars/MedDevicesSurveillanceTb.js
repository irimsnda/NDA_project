/**
 * Created by Kip on 2/26/2019.
 */
Ext.define('Admin.view.surveillance.views.toolbars.MedDevicesSurveillanceTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'meddevicessurveillancetb',
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
            name: 'meddevicesSurveillanceHomeBtn',
            dash_wrapper: 'meddevicessurveillancedashwrapper',
            dashboard: 'meddevicessurveillancedashwrapper'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[

                    {
                        text: 'PMS Implementation Plan Sample Collection and Review',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'meddevicessurveillancedashwrapper',
                        handler:'showNewPmsApplication',
                        app_type: 38
                    },
                    '-',
                    {
                        text: 'Normal PMS Sample Collection and Analysis',
                        iconCls: 'x-fa fa-check',
                        wrapper_xtype: 'meddevicessurveillancedashwrapper',
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
                        wrapper_xtype: 'meddevicessurveillancedashwrapper',
                        app_type: 38
                    },
                    {
                        text: 'Non-Structured Surveillance',
                        iconCls: 'x-fa fa-check',
                        handler:'showPmsApplicationWorkflow',
                        wrapper_xtype: 'meddevicessurveillancedashwrapper',
                        app_type: 37
                    }
                ]
            }
        }
    ]
});