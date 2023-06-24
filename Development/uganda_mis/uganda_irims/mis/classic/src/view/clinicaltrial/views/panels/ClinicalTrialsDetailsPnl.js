/**
 * Created by Kip on 1/16/2019.
 */
Ext.define('Admin.view.clinicaltrial.views.panels.ClinicalTrialsDetailsPnl', {
    extend: 'Ext.tab.Panel',
    xtype: 'clinicaltrialsdetailspnl',
    height: Ext.Element.getViewportHeight() - 118,
    autoScroll: true,
    scrollable: true,
    items: [
        {
            xtype: 'clinicaltrialdetailsfrm',
            title:'Clinical Trial Application Details'
        },
        {
            title: 'Clinical Trial Sponsor',
            xtype: 'clinicaltrialsponsorfrm'
        },
        {
            title: 'Clinical Principal Investigator',
            xtype: 'clinicaltrialinvestigatorfrm'
        }
    ]
});