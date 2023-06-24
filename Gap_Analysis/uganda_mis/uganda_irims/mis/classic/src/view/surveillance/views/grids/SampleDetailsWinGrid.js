/**
 * Created by Kip on 3/13/2019.
 */
Ext.define('Admin.view.surveillance.views.grids.SampleDetailsWinGrid', {
    extend: 'Admin.view.surveillance.views.grids.SampleDetailsGrid',
    xtype: 'sampledetailswingrid',
    dockedItems: [
        {
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
                {
                    xtype: 'pagingtoolbar',
                    width: '100%',
                    displayInfo: true,
                    displayMsg: 'Showing {0} - {1} of {2} total records',
                    emptyMsg: 'No Records',
                    beforeLoad: function () {
                        var store = this.getStore(),
                            grid = this.up('grid'),
                            win = grid.up('window');
                            if(win){
                                application_id = win.down('hiddenfield[name=application_id]').getValue();
                                store.getProxy().extraParams = {
                                    application_id: application_id
                                }
                            }
                          
                        
                    }
                }
            ]
        }
    ]
});