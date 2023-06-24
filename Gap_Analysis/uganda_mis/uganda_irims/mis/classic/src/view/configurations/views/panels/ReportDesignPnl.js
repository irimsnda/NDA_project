Ext.define('Admin.view.configurations.views.panels.ReportDesignPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'reportDesignPnl',
    title: 'Report Designer',
    userCls: 'big-100 small-100',
    height: Ext.Element.getViewportHeight() - 118,
    layout: 'border',
    split: true,
    margin: 5,
    resizable: true,
    items: [{
             xtype: 'reportdesignergrid',
             title: 'Added Designs',
             region: 'west',
             collapsible: true,
             width: 300,
             split: true
        },
        {
            xtype: 'reportDesignerViewerFrm',
            split: true,
            title: 'Viewer',
            collapsible: true,
            region: 'center'
        }
    ]
});

