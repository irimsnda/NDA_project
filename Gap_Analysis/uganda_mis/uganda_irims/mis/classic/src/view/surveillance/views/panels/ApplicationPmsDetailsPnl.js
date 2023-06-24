/**
 * Created by Kip on 3/7/2019.
 */
Ext.define('Admin.view.surveillance.views.panels.ApplicationPmsDetailsPnl', {
    extend: 'Ext.panel.Panel',
    xtype: 'applicationpmsdetailspnl',
    layout: 'fit',
    items: [
        {
            xtype: 'panel',
            title: 'PMS Details',
            scrollable: true,
            items:[
              /*  {
                    xtype: 'applicationpmsprogramdetailsfrm'
                },*/
                {
                    xtype: 'applicationpmsplandetailsfrm'
                }
            ]
        }
    ]
});