Ext.define('Admin.view.configurations.views.dashboards.AdvertisementType', {
     extend: 'Ext.panel.Panel',
    xtype: 'advertisementtype',
    userCls: 'big-100 small-100',
    layout:{
        type: 'fit'
    },
	title:'Advertisement Type',
    items: [
        {
            xtype: 'advertisementtypeGrid'
        }
    ] 

});
