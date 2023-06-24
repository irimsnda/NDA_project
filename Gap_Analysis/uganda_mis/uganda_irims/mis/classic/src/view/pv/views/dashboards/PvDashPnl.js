Ext.define('Admin.view.pv.views.dashboards.PvDashPnl', {
    extend: 'Ext.Container',
    xtype: 'pvdashPnl',
    layout: 'border',
    items: [
        {
            xtype: 'pvgrid',
            region: 'center',
            title: 'Active Tasks',
            margin: 2,
            bbar: [{
                xtype: 'pagingtoolbar',
                width: '100%',
                displayInfo: true,
                displayMsg: 'Showing {0} - {1} of {2} total records',
                emptyMsg: 'No Records',
                beforeLoad: function () {

                    this.up('grid').fireEvent('refresh', this);

                }
            }]
        }
    ]
});