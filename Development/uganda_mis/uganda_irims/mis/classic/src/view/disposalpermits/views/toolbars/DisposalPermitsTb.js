/**
 * Created by Kip on 9/22/2018.
 */
Ext.define('Admin.view.disposalpermits.views.toolbars.DisposalPermitsTb', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'disposalpermitstb',
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
            sec_dashboard:'disposalapplicationsdash',
            name: 'disposalpermitstbRegHomeBtn'
        },
        {
            text: 'Disposal Permits Applications',
            iconCls: 'x-fa fa-check',
            handler:'showNewDisposalApplications',
            app_type: 41
        },
        '->',
        {
            text: 'Documents',
            iconCls: 'x-fa fa-folder'
        },
        {
            text: 'Workflow',
            iconCls: 'x-fa fa-sitemap',
            menu:{
                xtype: 'menu',
                items:[
                    {
                        text: 'Disposal Permits Applications',
                        iconCls: 'x-fa fa-check',
                        handler:'disposalapplicationsdashwrapper',
                        wrapper_xtype:'',
                        app_type: 41
                    }
                    
                ]
            }
        }
    ]
});