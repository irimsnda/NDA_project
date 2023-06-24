/**
 * Created by Kip on 1/5/2019.
 */
Ext.define('Admin.view.gmpapplications.views.maininterfaces.new.NewGMPConsitionalApprovals', {
    extend: 'Ext.panel.Panel',
    xtype: 'newgmpconditionalapprovals',
    layout:'fit',
    dockedItems: [
        {
            xtype: 'batchprocesstoolbar',
            
    }],
    items: [
        {
            xtype: 'newgmpconditionalapprovalspanel'
        }
    ]
});