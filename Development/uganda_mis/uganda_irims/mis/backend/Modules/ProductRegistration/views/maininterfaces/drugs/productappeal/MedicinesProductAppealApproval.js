/**
 * Created by Kip on 10/18/2018.
 */
Ext.define('Admin.view.productregistration.views.maininterfaces.drugs.productappeal.MedicinesProductAppealApproval', {
    extend: 'Ext.panel.Panel',
    xtype: 'medicinesproductappealapproval',
    controller: 'productregistrationvctr',
    viewModel: 'productregistrationvm',
    layout: 'fit',
    items: [
        {
            xtype: 'productappealapprovalpnl',
            itemId: 'main_processpanel',
            productdetails_panel: 'drugsProductsDetailsPanel',
        }
    ]
});

