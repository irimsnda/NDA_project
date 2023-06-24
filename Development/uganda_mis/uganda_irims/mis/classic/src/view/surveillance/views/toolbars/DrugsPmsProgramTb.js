Ext.define('Admin.view.surveillance.views.toolbars.DrugsPmsProgramTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'drugspmsprogramtb',
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
            //name: 'drugsPmsSchedulingHomeBtn',
            //dash_wrapper: 'drugssurveillancedashwrapper',
            //dashboard: 'drugssurveillancedashwrapper'
        },
        {
            text: 'New Application',
            iconCls: 'x-fa fa-plus-square',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        xtype: 'button',
                        text: 'Add Program',
                        iconCls: 'x-fa fa-check',
                        action:'add'
                        
                    }
                ]
            }
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        }
        // {
        //     text: 'Workflow',
        //     iconCls: 'x-fa fa-sitemap',
        //     menu:{
        //         xtype: 'menu',
        //         items:[
        //             {
        //                 text: 'Structured Surveillance',
        //                 iconCls: 'x-fa fa-check',
        //                 handler:'showPmsApplicationWorkflow',
        //                 wrapper_xtype: 'drugssurveillancedashwrapper',
        //                 app_type: 38
        //             },
        //             {
        //                 text: 'Non-Structured Surveillance',
        //                 iconCls: 'x-fa fa-check',
        //                 handler:'showPmsApplicationWorkflow',
        //                 wrapper_xtype: 'drugssurveillancedashwrapper',
        //                 app_type: 37
        //             }
        //         ]
        //     }
        // }
    ]
});